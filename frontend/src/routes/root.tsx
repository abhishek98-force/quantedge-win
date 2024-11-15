import { Outlet } from 'react-router-dom';
import { AppSidebar } from '@/components/app-sidebar';
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';

//adding dark theme
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';

const root = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <header className="flex justify-between flex-1 h-16 shrink-0 items-center gap-2 border-b px-4 py-2">
              <span className="flex flex-row items-center">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
              </span>
              <span className="flex flex-row-reverse">
                <ModeToggle />
              </span>

              {/* <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb> * */}
            </header>
            <div className="p-4 h-full">
              {/* <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
              <Outlet />
            </div>
          </SidebarInset>
        </SidebarProvider>
        {/* <div className="fixed left-0 w-1/5 h-screen bg-slate-500">
        <div className="text-xl my-4 pl-2">Quantedge</div>
        <div className="pl-3">
          <nav className="list-none">
            <li>
              <ul>
                <li>
                  <Link to={`home`}>Home</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={`technical-analysis`}>Technical Analysis</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={`sentiment-analysis`}>Sentiment Analysis</Link>
                </li>
              </ul>
              <ul>
                <li>
                  <Link to={`fundamental-analysis`}>Fundamental Analysis</Link>
                </li>
              </ul>
              <ul
                <li>
                  <Link to={`prompts`}>Prompts</Link>
                </li>
              </ul>
            </li>
          </nav>
        </div>
      </div> */}
        {/* <div className="p-3 h-full">
          <Outlet />
        </div> */}
      </div>
    </ThemeProvider>
  );
};

export default root;
